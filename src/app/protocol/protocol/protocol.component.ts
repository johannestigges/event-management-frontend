import { Component, OnInit } from '@angular/core';
import { Protocol } from 'src/app/model/protocol';
import { ProtocolService } from '../protocol.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'evm-protocol',
    templateUrl: './protocol.component.html',
    imports: [DatePipe]
})
export class ProtocolComponent implements OnInit {
  protocols: Protocol[] = [];
  constructor(private protocolService: ProtocolService) { }

  ngOnInit(): void {
    this.protocolService
      .getAll()
      .subscribe((protocols) => (this.protocols = protocols));
  }
}
