import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { HomeAssistantRXJS } from '../lib';

export class Office {
  constructor(private harxjs: HomeAssistantRXJS) {}

  readonly motion$ = this.harxjs.entities$.pipe(
    map(entities => entities['binary_sensor.office_office_motion_114']),
    map(motionSensor => motionSensor?.state),

    distinctUntilChanged(),
    tap(_ => console.log('motion', _)),
  );

  turnOnCeilingLight() {
    return this.harxjs.services.call('light', 'turn_on', {
      entity_id: 'light.office_office_ceiling_light_104',
    });
  }

  turnOffCeilingLight() {
    return this.harxjs.services.call('light', 'turn_off', {
      entity_id: 'light.office_office_ceiling_light_104',
    });
  }
}
