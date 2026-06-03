import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../../services/plan.service';
import { HeaderMenuService } from '../../services/header-menu.service';
import { environment } from 'src/environments/environment';


declare var Razorpay: any;
@Component({
  selector: 'app-plan-purchase',
  imports: [CommonModule, FormsModule],
  templateUrl: './plan-purchase.component.html',
  styleUrl: './plan-purchase.component.css'
})
export class PlanPurchaseComponent {
  private planService = inject(PlanService);
  private examTypes = inject(HeaderMenuService);
  selectedExamSlug: string = '';

  selectedPlan: any = null;

  exams = this.examTypes.menus;

  ngOnInit(): void {
    this.examTypes.loadMenus();
  }

  onExamChange(): void {
    this.planService.getPlanBySlug(this.selectedExamSlug).subscribe(plan => {
      this.selectedPlan = plan;
    })
  }

  purchasePlan(): void {

    if (!this.selectedPlan) {
      return;
    }

    // STEP 1:
    // CREATE ORDER FROM BACKEND

    this.planService.createOrder({
      plan_id: this.selectedPlan.id
    }).subscribe({

      next: (orderResponse: any) => {

        const order = orderResponse.data;

        const options = {

          key: environment.razorpayKey,

          amount: order.amount,
          currency: order.currency,
          name: 'Dreaho Test Series',
          description: `${this.selectedPlan.exam_name} Plan Purchase`,
          image: 'localhost:4200/assets/logo.png',
          order_id: order.id,
          theme: {
            color: '#890117'
          },

          handler: (response: any) => {

            console.log('Payment Success', response);

            // STEP 2:
            // VERIFY PAYMENT

            this.planService.verifyPayment({

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_order_id: response.razorpay_order_id,

              razorpay_signature: response.razorpay_signature

            }).subscribe({

              next: (verifyRes: any) => {

                console.log('Payment Verified', verifyRes);
                console.log('Payment order', order);

                // STEP 3:
                this.planService.purchasePlan({plan_id:this.selectedPlan.id, payment_id:order.id, amount:order.amount/100}).subscribe();

                // STEP 4:
                // REDIRECT TO DASHBOARD
                setTimeout(() => {
                  window.location.href = '/active-plan';
                }, 1000);

              },
              error: (err) => {

                console.error('Verification Failed', err);

                alert('Payment verification failed');
              }
            });
          },

          modal: {
            ondismiss: () => {
              console.log('Payment popup closed');
            }
          },

          prefill: {
            name: 'Student Name',
            email: 'student@example.com',
            contact: '9999999999'
          }

        };

        const razorpay = new Razorpay(options);

        razorpay.open();
      },

      error: (err) => {

        console.error('Order Creation Failed', err);

        alert('Unable to create payment order');
      }
    });
  }
}
