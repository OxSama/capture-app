// @flow
import { batchActions } from 'redux-batched-actions';
import uuid from 'd2-utilizr/src/uuid';
import moment from '../../../../../utils/moment/momentResolver';
import { convertValue as convertListValue } from '../../../../../converters/clientToList';
import elementTypes from '../../../../../metaData/DataElement/elementTypes';
import {
    actionTypes as editEventDataEntryActionTypes,
    batchActionTypes as editEventDataEntryBatchActionTypes,
    startAddNoteForEditSingleEvent,
} from '../editEventDataEntry.actions';

import {
    addEventNote,
    removeEventNote,
} from '../../editEvent.actions';

import {
    addNote,
    removeNote,
} from '../../../../DataEntry/actions/dataEntry.actions';
import { getCurrentUser } from '../../../../../d2/d2Instance';

export const addNoteForEditSingleEventEpic = (action$: InputObservable, store: ReduxStore) =>
    // $FlowSuppress
    action$.ofType(editEventDataEntryActionTypes.REQUEST_ADD_NOTE_FOR_EDIT_SINGLE_EVENT)
        .map((action) => {
            const state = store.getState();
            const payload = action.payload;
            const eventId = state.dataEntries[payload.dataEntryId].eventId;
            const userName = getCurrentUser().username;

            const serverData = {
                event: eventId,
                notes: [{ value: payload.note }],
            };

            const clientNote = { value: payload.note, storedBy: userName, storedDate: moment().toISOString(), clientId: uuid() };
            const formNote = { ...clientNote, storedDate: convertListValue(clientNote.storedDate, elementTypes.DATETIME) };
            const saveContext = {
                dataEntryId: payload.dataEntryId,
                itemId: payload.itemId,
                eventId,
                noteClientId: clientNote.clientId,
            };

            return batchActions([
                startAddNoteForEditSingleEvent(eventId, serverData, state.currentSelections, saveContext),
                addNote(payload.dataEntryId, payload.itemId, formNote),
                addEventNote(eventId, clientNote),
            ], editEventDataEntryBatchActionTypes.ADD_NOTE_FOR_EDIT_SINGLE_EVENT_BATCH);
        });

export const removeNoteForEditSingleEventEpic = (action$: InputObservable) =>
    // $FlowSuppress
    action$.ofType(editEventDataEntryActionTypes.ADD_NOTE_FAILED_FOR_EDIT_SINGLE_EVENT)
        .map((action) => {
            const context = action.meta.context;
            return batchActions([
                removeNote(context.dataEntryId, context.itemId, context.noteClientId),
                removeEventNote(context.eventId, context.noteClientId),
            ], editEventDataEntryBatchActionTypes.REMOVE_NOTE_FOR_EDIT_SINGLE_EVENT_BATCH);
        });
