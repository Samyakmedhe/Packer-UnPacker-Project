import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-unpacker',
  standalone: false,
  templateUrl: './unpacker.component.html',
  styleUrl: './unpacker.component.css'
})
export class UnpackerComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUnpack() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:8080/unpack', formData, { responseType: 'blob' })
        .subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'unpacked.zip';
          a.click();
        });
    }
  }
}