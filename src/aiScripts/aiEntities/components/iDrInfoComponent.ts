
/**
 * @interface IDrInfoComponent
 * Contains information about the daily routine of and entity. E.g when the current daily routine started, or when it will end.
 * 
 * @field entityId: id of the entity for which the daily routine information should be checked
 * @field startHour: start hour of the period - of the current daily routine
 * @field startMinute: start minute of the period - of the current daily routine
 * @field endHour: end hour of the period - of the current daily routine
 * @field endMinute: end minute of the period - of the current daily routine
 * @field lastHour: the last hour where the daily routine was checked
 * @field lastMinute: the last minute where the daily routine was checked
 */
export interface IDrInfoComponent {
    entityId: number,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
    lastHour: number,
    lastMinute: number
}