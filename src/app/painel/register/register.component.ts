import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from '../../core/service/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private registerService: RegisterService
  ) {
    this.form = this.fb.group({
      phone: [null, Validators.required],
      name: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      const maskedPhone = this.form.get('phone')?.value || '';
      const numeroWhats = maskedPhone.replace(/\D/g, '');
      const name = this.form.get('name')?.value;

      this.registerService.register(name, numeroWhats).subscribe({
        next: (resultado: any) => {
          this.activeModal.close(this.form.value);

          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'You will now receive air quality alerts 🌤️',
            background: '#f8fafc',
            color: '#1f2937',
            confirmButtonText: 'OK',
            confirmButtonColor: '#22c55e',
            // timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            customClass: {
              popup: 'rounded-alert',
            },
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong. Please try again later.',
            confirmButtonColor: '#ef4444',
            customClass: {
              popup: 'rounded-alert',
            },
          });
        },
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  onPhoneInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 5) {
      // telefone fixo
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      // apenas DDD + começo do número
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      // apenas DDD
      value = value.replace(/^(\d*)/, '($1');
    }

    event.target.value = value;
    this.form.get('phone')?.setValue(value, { emitEvent: false });
  }
}
