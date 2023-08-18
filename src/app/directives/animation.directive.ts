import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[fadeIn]',
})
export class FadeInDirective implements OnInit {
  @Input() repeat = false;
  @Input() animation = 'visible';
  @Input() thresholdMax = 0.8;
  @Input() thresholdMin = 0;
  @Output() isVisible = new EventEmitter<string>();

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createObserver();
  }

  addClassName(className: string) {
    this.renderer.addClass(this.element.nativeElement, className);
    this.isVisible.emit();
  }

  removeClassName(className: string) {
    if (this.element.nativeElement.classList.contains(className)) {
      this.renderer.removeClass(this.element.nativeElement, className);
    }
  }

  createObserver() {
    const options = {
      threshold: [this.thresholdMin, this.thresholdMax],
    };

    const callback = (entries: any[]) => {
      entries &&
      entries.forEach((entry) => {
        if (this.element.nativeElement.classList.contains(this.animation) && !this.repeat) {
          return
        }
        else if (entry.isIntersecting) {
          this.addClassName(this.animation);
        } else {
          this.removeClassName(this.animation);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const target = this.element.nativeElement;
    target && observer.observe(target);
  }
}
