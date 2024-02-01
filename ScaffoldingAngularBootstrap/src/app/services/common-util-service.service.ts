import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonUtilServiceService {

  constructor() { }

  public LoaderON()  { document.getElementById("overlayLoader").style.display = "flex";  }
  public LoaderOFF() { document.getElementById("overlayLoader").style.display = "none";}
}
