import { animate, style, transition, trigger } from '@angular/animations';
import { menu } from '../../enums/menu.enum';

export const slideIn = trigger("slideIn", [
  transition(":enter", [
    style({ opacity: 0, transform: "translateX(-100%)" }), //apply default styles before animation starts
    animate(
      "750ms ease-in-out",
      style({ opacity: 1, transform: "translateX(0)" })
    )
  ]),
  transition(":leave", [
    style({ opacity: 1, transform: "translateX(0)" }), //apply default styles before animation starts
    animate(
      "600ms ease-in-out",
      style({ opacity: 0, transform: "translateX(-100%)" })
    )
  ])
]);

// export function removeHeaderStyle() {
//     const wrapper = document.getElementById("nav-link-wrapper");
//     const header  = document.getElementById("header");
//     const body    = document.getElementById("body");
//     const footer  = document.getElementById("footer");
//     const button =  document.querySelector("#hamburger-button");


//     if(wrapper){
//       //Remove style attribute
//       wrapper.classList.add('animate__animated', 'animate__backOutLeft');
//       setTimeout(() => {
//         wrapper.removeAttribute("style");
//         const child = wrapper.firstElementChild as HTMLElement;
//         if(child){
//           child.removeAttribute("style");
//           child.childNodes.forEach((node) => {
//             (node as HTMLElement).removeAttribute("style");
//           });
//         }
//         wrapper.classList.remove('animate__animated', 'animate__backOutLeft');
//       }, 200);

//     }

//     if(body)
//       body.removeAttribute("style");
//     if(footer)
//       footer.removeAttribute("style");

//     if(button?.classList.contains("opened")){
//       button.classList.remove("opened");
//       button.setAttribute("aria-expanded", "false");
//     }
//   }


// export function annimateHeader(status:any){
//   const wrapper       = document.getElementById("nav-link-wrapper");
//   const header        = document.getElementById("header");
//   const body          = document.getElementById("body");
//   const footer        = document.getElementById("footer");
//   const logoutButton  =  document.querySelector(".logout");



//   if(status === menu.opened){
//     if(wrapper){
//       wrapper.style.display = "block";
//       //Get the next child of the wrapper
//       const child = wrapper.firstElementChild as HTMLElement;
//       if(child){
//         child.style.display = "flex";
//         child.style.flexDirection = "column";
//         child.style.width = "100%";

//         //foreach child of child
//         child.childNodes.forEach((node) => {
//           (node as HTMLElement).style.marginLeft = "0";
//         });
//       }
//       wrapper.classList.add('animate__animated', 'animate__backInLeft','animate__faster');
//     }

//     if(body)
//       body.style.display = "none";
//     if(footer)
//       footer.style.display = "none";
//     if(logoutButton)
//       (logoutButton as HTMLElement).style.display = "flex";

//   }else{
//     removeHeaderStyle();
//   }
// }
