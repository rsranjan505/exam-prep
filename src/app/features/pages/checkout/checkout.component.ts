import { Component } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  name: string = '';
  email: string = '';
  mobile: string = '';
  address: string = '';
  paymentMethod: string = 'online';

  constructor(private cart: CartserviceService) {}

  get total() {
    return this.cart.getTotal();
  }

  placeOrder() {
    if (this.paymentMethod === 'online') {
      this.payWithRazorpay();
    } else {
      alert('Order placed with Cash on Delivery!');
      this.cart.clear();
    }
  }

  payWithRazorpay() {
    const options = {
      key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay key
      amount: this.total * 100, // amount in paise
      currency: 'INR',
      name: 'BPSC Prep Portal',
      description: 'Book Purchase',
      image: 'https://yourdomain.com/logo.png', // optional
      handler: (response: any) => {
        alert(
          'Payment Successful! Razorpay Payment ID: ' +
            response.razorpay_payment_id
        );
        this.cart.clear(); // Clear cart after success
      },
      prefill: {
        name: this.name,
        email: this.email,
        contact: this.mobile,
      },
      notes: {
        address: this.address,
      },
      theme: {
        color: '#2563eb', // Tailwind blue-700
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
