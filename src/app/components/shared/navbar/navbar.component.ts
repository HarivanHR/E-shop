import { Component, OnInit, Output } from "@angular/core";
import { EventEmitter } from "events";
import { BodyService } from "src/app/services/body-service.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private body: BodyService) {}

  ngOnInit() {}
}
