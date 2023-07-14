import { Component, inject } from '@angular/core';
import { HolidayCardComponent } from '../holiday-card/holiday-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { HolidaysRepository } from '../+state';
import { concatMap, delay, filter, map } from 'rxjs/operators';
import { concat, first, of } from 'rxjs';
import { createHoliday } from '@app/holidays/model';
import { ImagesLoadedService } from '@app/shared';
import { toSignal } from '@angular/core/rxjs-interop';

const hiddenVienna = createHoliday({
  id: -1,
  title: 'Hidden Vienna',
  teaser: 'Secret Holiday Unlocked',
  imageUrl: 'https://api.eternal-holidays.net/holiday/vienna.jpg',
  description:
    'Congratulations, your patience paid off. You have discovered our Easter egg.',
});
@Component({
  selector: 'app-holidays',
  template: `
    <div class="container">
      <app-holiday-card
        *ngFor="let holiday of holidays()"
        [holiday]="holiday"
        data-testid="holiday-card"
      />
    </div>
  `,
  styleUrls: ['./holidays.component.scss'],
  standalone: true,
  imports: [HolidayCardComponent, NgForOf, AsyncPipe],
})
export class HolidaysComponent {
  #imagesLoadedService = inject(ImagesLoadedService);

  holidays = toSignal(
    inject(HolidaysRepository).holidays$.pipe(
      concatMap((holidays) =>
        holidays.length
          ? concat(
              of(holidays),

              this.#imagesLoadedService.loaded$.pipe(
                filter(Boolean),
                map(() => [...holidays, hiddenVienna]),
                delay(1000),
                first()
              )
            )
          : of(holidays)
      )
    ),
    { requireSync: true }
  );
}
