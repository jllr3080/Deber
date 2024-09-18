import { Component, OnInit } from '@angular/core';
import { IClubes } from '../Interfaces/iclubes';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { ClubesService } from '../Services/clubes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clubes',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './clubes.component.html',
  styleUrl: './clubes.component.scss'
})
export class ClubesComponent implements OnInit {
  listaclubes: IClubes[] = [];

  constructor(private clubServicio: ClubesService) {}
  ngOnInit(): void {
    this.cargatabla();
  }
  
  cargatabla() {
    this.clubServicio.todos().subscribe((data) => {
      this.listaclubes = data;
    });
  }

}
