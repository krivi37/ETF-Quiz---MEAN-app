import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserRequest } from '../../interfaces/userreq.model';

@Component({
  selector: 'app-reg-requests',
  templateUrl: './reg-requests.component.html',
  styleUrls: ['./reg-requests.component.css']
})
export class RegRequestsComponent implements OnInit {

  user: UserRequest[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getRegistrationRequests().subscribe((data: UserRequest[]) => {
      this.user = data
    },
    err => {
      console.log(err);
      return false;
    });
  }

  approveRequest(user){
    this.adminService.approveRequest(user).subscribe(() => {
      this.adminService.getRegistrationRequests().subscribe((data: UserRequest[]) => {
        this.user = data
      },
      err => {
        console.log(err);
        return false;
      });
    })
  }
  denyRequest(user){
    this.adminService.denyRequest(user).subscribe(() => {
      this.adminService.getRegistrationRequests().subscribe((data: UserRequest[]) => {
        this.user = data
      },
      err => {
        console.log(err);
        return false;
      });
    })
  }
}
