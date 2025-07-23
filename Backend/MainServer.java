import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;

public class MainServer {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/pack", new FileHandler("pack"));
        server.createContext("/unpack", new FileHandler("unpack"));
        server.setExecutor(null); // default
        System.out.println("Server started at http://localhost:8080");
        server.start();
    }
}
