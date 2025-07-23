import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  selectedFiles: File[] = [];
  message = '';
  isSuccess = true;

  constructor(private http: HttpClient) {}

  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.message = '';
  }

  pack() {
    if (!this.selectedFiles.length) return this.showError('Select files first');
    this.upload('pack');
  }

  unpack() {
    if (!this.selectedFiles.length) return this.showError('Select a .pak file');
    this.upload('unpack');
  }

  upload(action: string) {
    const form = new FormData();
    this.selectedFiles.forEach(f => form.append('file', f));
    this.http.post(`http://localhost:8080/${action}`, form, { responseType: 'blob' })
      .subscribe({
        next: blob => this.download(blob, action === 'pack' ? 'packed.pak' : 'unpacked.zip'),
        error: () => this.showError(`${action} failed`)
      });
  }

  download(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    this.showSuccess(`Downloaded: ${name}`);
  }

  showSuccess(msg: string) {
    this.isSuccess = true;
    this.message = msg;
  }

  showError(msg: string) {
    this.isSuccess = false;
    this.message = msg;
  }
}