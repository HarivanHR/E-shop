import { Component, OnInit } from "@angular/core";
import { BodyService } from "src/app/services/body-service.service";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.css"]
})
export class PageComponent implements OnInit {
  constructor(private body: BodyService) {}

  ngOnInit() {}
}
