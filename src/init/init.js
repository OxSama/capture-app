// @flow
/* eslint-disable import/prefer-default-export */
import log from 'loglevel';
import { init, config, getUserSettings, getManifest } from 'd2/lib/d2';
import environments from 'capture-core/constants/environments';
import moment from 'capture-core/utils/moment/momentResolver';
import CurrentLocaleData from 'capture-core/utils/localeData/CurrentLocaleData';

// LANGUAGE FILES
import 'moment/locale/nb';
import dateFnNorwegianLocale from 'date-fns/locale/nb';
// END LANGUAGE FILES

import loadMetaData from 'capture-core/metaDataStoreLoaders/baseLoader/metaDataLoader';
import buildMetaData from 'capture-core/metaDataMemoryStoreBuilders/baseBuilder/metaDataBuilder';
import loadSessionCacheData from '../cache/session/sessionCacheLoader';
import getSystemSettings from './getSettings';

import type { LocaleDataType } from 'capture-core/utils/localeData/CurrentLocaleData';

function setLogLevel() {
    const levels = {
        [environments.dev]: log.levels.DEBUG,
        [environments.devDebug]: log.levels.TRACE,
        [environments.test]: log.levels.INFO,
        [environments.prod]: log.levels.ERROR,
    };

    // $FlowSuppress
    let level = levels[process.env.NODE_ENV];
    if (!level && level !== 0) {
        level = log.levels.ERROR;
    }

    log.setLevel(level);
}

async function initializeManifest() {
    const manifest = await getManifest('./manifest.webapp');
    const baseUrl = manifest.getBaseUrl();
    config.baseUrl = `${baseUrl}/api`;
    log.info(`Loading: ${manifest.name} v${manifest.version}`);
}

function configI18n({ keyUiLocale }) {
    const locale = keyUiLocale || 'en';
    config.i18n.sources.add(`i18n/module/i18n_module_${locale}.properties`);
    return keyUiLocale;
}

function setLocaleData(locale: string, d2: D2) {
    moment.locale('nb');
    const weekdays = moment.weekdays();
    const weekdaysShort = moment.weekdaysShort();

    const firstDayOfWeek = moment.localeData()._week.dow;

    const localeData: LocaleDataType = {
        dateFnsLocale: dateFnNorwegianLocale,
        weekDays: weekdays,
        weekDaysShort: weekdaysShort,
        calendarFormatHeaderLong: 'dddd D MMM',
        calendarFormatHeaderShort: 'D MMM',
        selectDatesText: 'Velg en eller flere datoer...',
        selectDateText: 'Velg en dato...',
        todayLabelShort: 'I dag',
        todayLabelLong: 'I dag',
        weekStartsOn: firstDayOfWeek,
    };

    CurrentLocaleData.set(localeData);
}

export async function initializeD2() {
    setLogLevel();

    let currentLocale;

    const d2 = await initializeManifest()
        .then(getUserSettings)
        .then(configI18n)
        .then((locale: string) => {
            currentLocale = locale;
        })
        .then(init);

    setLocaleData(currentLocale, d2);

    return d2;
}

export async function getBaseSettings() {
    const systemSettings = await getSystemSettings();
    return {
        systemSettings,
    };
}

export async function initializeMetaData(systemSettings: Object) {
    await loadMetaData();
    await buildMetaData(systemSettings.keyUiLocale);
}

export async function initializeSessionAppCache() {
    await loadSessionCacheData();
}

