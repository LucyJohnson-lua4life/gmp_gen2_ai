import {Heap} from 'heap-js';
import {IAiAction} from '../iAiAction';
export interface IActionsComponent{
    nextActions: Heap<IAiAction>,
}