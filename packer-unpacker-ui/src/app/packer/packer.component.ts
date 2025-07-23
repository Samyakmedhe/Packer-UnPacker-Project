import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-packer',
  standalone: false,
  templateUrl: './packer.component.html',
  styleUrl: './packer.component.css'
})
export class PackerComponent {
  selectedFiles: File[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onPack() {
    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    this.http.post('http://localhost:8080/pack', formData, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'packed.pak';
        a.click();
      });
  }
}