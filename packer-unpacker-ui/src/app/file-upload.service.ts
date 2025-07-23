import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(private http: HttpClient) {}

  pack(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    return this.http.post('http://localhost:8080/pack', formData, {
      responseType: 'blob'
    });
  }

  unpack(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    return this.http.post('http://localhost:8080/unpack', formData, {
      responseType: 'blob'
    });
  }
}
