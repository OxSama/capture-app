// @flow
import log from 'loglevel';

import errorCreator from '../../../utils/errorCreator';
import TextField from '../../FormFields/Generic/D2TextField.component';
import TrueFalse from '../../FormFields/Generic/D2TrueFalse.component';
import TrueOnly from '../../FormFields/Generic/D2TrueOnly.component';
import D2Date from '../../FormFields/DateAndTime/D2Date/D2Date.component';
import D2DateTime from '../../FormFields/DateAndTime/D2DateTime/D2DateTime.component';

import OptionsCheckboxes from '../../FormFields/Options/Checkboxes/OptionsCheckboxes.component';
import OptionsSelect from '../../FormFields/Options/SelectVirtualized/OptionsSelectVirtualized.component';
import withSelectTranslations from '../../FormFields/Options/SelectVirtualized/withTranslations';
import withConvertedOptionSet from '../../FormFields/Options/withConvertedOptionSet';

import getValidators from './validators';
import MetaDataElement from '../../../metaData/DataElement/DataElement';
import elementTypes from '../../../metaData/DataElement/elementTypes';

import withDefaultChangeHandler from './withDefaultChangeHandler';
import withDefaultShouldUpdateInterface from './withDefaultShouldUpdateInterface';
import withDefaultFieldContainer from './withDefaultFieldContainer';
import withDefaultMessages from './withDefaultMessages';
import withHideCompatibility from './withHideCompatibility';
import withGotoInterface from './withGotoInterface';

import type { Field, ValidatorContainer } from '../../../__TEMP__/FormBuilderNew.component';


const commitEvents = {
    ON_BLUR: 'onBlur',
};
const errorMessages = {
    NO_FORMFIELD_FOR_TYPE: 'Formfield component not specified for type',
};

const getBaseComponentProps = () => ({
    style: {
        width: '100%',
    },
});

const getBaseFieldProps = (metaData: MetaDataElement) => ({
    validators: getValidators(metaData),
    commitEvent: commitEvents.ON_BLUR,
});

const createComponentProps = (componentProps: Object) => ({
    ...getBaseComponentProps(),
    ...componentProps,
});

const createFieldProps = (fieldProps: Object, metaData: MetaDataElement) => ({
    ...getBaseFieldProps(metaData),
    ...fieldProps,
});

const getBaseTextField = (metaData: MetaDataElement) => {
    const props = createComponentProps({
        label: metaData.formName,
        multiline: false,
        required: metaData.compulsory,
    });

    return createFieldProps({
        id: metaData.id,
        component: withGotoInterface()(withHideCompatibility()(withDefaultShouldUpdateInterface()(withDefaultFieldContainer()(withDefaultMessages()(withDefaultChangeHandler()(TextField)))))),
        props,
    }, metaData);
};

const fieldForTypes = {
    [elementTypes.TEXT]: (metaData: MetaDataElement) => getBaseTextField(metaData),
    [elementTypes.LONG_TEXT]: (metaData: MetaDataElement) => {
        const baseField = getBaseTextField(metaData);
        const props = { ...baseField.props, multiLine: true };
        return { ...baseField, props };
    },
    [elementTypes.NUMBER]: (metaData: MetaDataElement) => getBaseTextField(metaData),
    [elementTypes.INTEGER]: (metaData: MetaDataElement) => getBaseTextField(metaData),
    [elementTypes.INTEGER_POSITIVE]: (metaData: MetaDataElement) => getBaseTextField(metaData),
    [elementTypes.INTEGER_ZERO_OR_POSITIVE]: (metaData: MetaDataElement) => getBaseTextField(metaData),
    [elementTypes.BOOLEAN]: (metaData: MetaDataElement) => {
        const props = createComponentProps({
            label: metaData.formName,
            required: metaData.compulsory,
        });

        return createFieldProps({
            id: metaData.id,
            component: withGotoInterface()(withHideCompatibility()(withDefaultShouldUpdateInterface()(withDefaultFieldContainer({ marginBottom: 0 })(withDefaultMessages()(TrueFalse))))),
            props,
        }, metaData);
    },
    [elementTypes.TRUE_ONLY]: (metaData: MetaDataElement) => {
        const props = createComponentProps({
            label: metaData.formName,
            nullable: !metaData.compulsory,
        });

        return createFieldProps({
            id: metaData.id,
            component: withGotoInterface()(withHideCompatibility()(withDefaultShouldUpdateInterface()(withDefaultFieldContainer({ marginBottom: 0 })(withDefaultMessages()(TrueOnly))))),
            props,
        }, metaData);
    },
    [elementTypes.DATE]: (metaData: MetaDataElement) => {
        const props = createComponentProps({
            width: 350,
            label: metaData.formName,
        });

        return createFieldProps({
            id: metaData.id,
            component: withGotoInterface()(withHideCompatibility()(withDefaultShouldUpdateInterface()(withDefaultFieldContainer()(withDefaultMessages()(withDefaultChangeHandler()(D2Date)))))),
            props,
        }, metaData);
    },
    [elementTypes.DATETIME]: (metaData: MetaDataElement) => {
        const props = createComponentProps({
            dateWidth: 200,
            calendarWidth: 350,
            label: metaData.formName,
            required: metaData.compulsory,
        });

        return createFieldProps({
            id: metaData.id,
            component: withGotoInterface()(withHideCompatibility()(withDefaultShouldUpdateInterface()(withDefaultFieldContainer()(withDefaultMessages()(withDefaultChangeHandler()(D2DateTime)))))),
            props,
        }, metaData);
    },
    [elementTypes.TIME]: (metaData: MetaDataElement) => getBaseTextField(metaData),
    [elementTypes.PERCENTAGE]: (metaData: MetaDataElement) => getBaseTextField(metaData),
    [elementTypes.UNKNOWN]: () => null,
};

const optionSetField = (metaData: MetaDataElement) => {
    const props = createComponentProps({
        label: metaData.formName,
        optionSet: metaData.optionSet,
        nullable: !metaData.compulsory,
    });

    return createFieldProps({
        id: metaData.id,
        component: withGotoInterface()(withHideCompatibility()(withDefaultShouldUpdateInterface()(withDefaultFieldContainer()(withDefaultMessages()(withConvertedOptionSet()(withSelectTranslations()(OptionsSelect))))))),
        props,
    }, metaData);
};

export default function buildField(metaData: MetaDataElement) {
    const type = metaData.type;
    if (!fieldForTypes[type]) {
        log.warn(errorCreator(errorMessages.NO_FORMFIELD_FOR_TYPE)({ metaData }));
        return fieldForTypes[elementTypes.UNKNOWN](metaData);
    }

    if (metaData.optionSet) {
        return optionSetField(metaData);
    }

    return fieldForTypes[type](metaData);
}
