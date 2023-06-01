import { Injectable } from '@angular/core';
import { Peer } from "peerjs";


@Injectable({
  providedIn: 'root'
})
export class PeerjsService {

  constructor() { }

  getOwnPeerObject(){
    return new Peer(`harikrushna${new Date()}`);
  }
  connectAnotherPeer(ownPeerObj : Peer,remotePeerId:string){
    return ownPeerObj.connect(remotePeerId);
  }

}
