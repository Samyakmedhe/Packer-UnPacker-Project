import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.disk.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;

public class FileHandler implements HttpHandler {
    private final String action;

    public FileHandler(String action) {
        this.action = action;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
            exchange.sendResponseHeaders(405, -1);
            return;
        }

        // Enable CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

        try {
            // Setup file upload
            DiskFileItemFactory factory = new DiskFileItemFactory();
            FileUpload upload = new FileUpload(factory);

            // Read full request body into byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            exchange.getRequestBody().transferTo(baos);
            byte[] requestBodyBytes = baos.toByteArray();

            // Extract headers
            Map<String, List<String>> headers = exchange.getRequestHeaders();
            String contentType = headers.getOrDefault("Content-Type", List.of("")).get(0);

            // Create fake RequestContext (required by FileUpload)
            RequestContext ctx = new RequestContext() {
                public String getCharacterEncoding() {
                    return "UTF-8";
                }

                public String getContentType() {
                    return contentType;
                }

                public int getContentLength() {
                    return requestBodyBytes.length;
                }

                public InputStream getInputStream() {
                    return new ByteArrayInputStream(requestBodyBytes);
                }
            };

            // Parse uploaded files
            List<FileItem> items = upload.parseRequest(ctx);

            Path tempDir = Files.createTempDirectory("upload_");
            List<File> uploadedFiles = new ArrayList<>();

            for (FileItem item : items) {
                if (!item.isFormField()) {
                    File file = new File(tempDir.toFile(), item.getName());
                    item.write(file);
                    uploadedFiles.add(file);
                }
            }

            if (uploadedFiles.isEmpty()) {
                throw new IOException("No files uploaded.");
            }

            File resultFile;

            if (action.equals("pack")) {
                resultFile = new File(tempDir.toFile(), "packed.pak");
                Packer.packFiles(uploadedFiles.toArray(new File[0]), resultFile);
            } else {
                File outputDir = new File(tempDir.toFile(), "unpacked");
                outputDir.mkdir();

                Unpacker.unpackFile(uploadedFiles.get(0), outputDir);

                File[] unpacked = outputDir.listFiles();
                if (unpacked == null || unpacked.length == 0) {
                    throw new IOException("Unpacked folder is empty.");
                }

                resultFile = new File(tempDir.toFile(), "unpacked.zip");
                Packer.packFiles(unpacked, resultFile);
            }

            // Send back the packed/unpacked file
            byte[] responseBytes = Files.readAllBytes(resultFile.toPath());
            exchange.getResponseHeaders().set("Content-Type", "application/octet-stream");
            exchange.getResponseHeaders().set("Content-Disposition", "attachment; filename=" + resultFile.getName());
            exchange.sendResponseHeaders(200, responseBytes.length);

            OutputStream os = exchange.getResponseBody();
            os.write(responseBytes);
            os.close();

        } catch (Exception e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(500, -1);
        }
    }
}
