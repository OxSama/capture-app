// @flow
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { urlArguments, getUrlQueries } from '../../../utils/url';

export const useSetOrgUnitId = () => {
    const history = useHistory();
    const pathname: string = useSelector(({ router: { location } }) => location.pathname);

    const setOrgUnitId = (orgUnitId: string, pageToPush: string = pathname) => {
        const restOfQueries = getUrlQueries();
        history.push(`${pageToPush}?${urlArguments({ ...restOfQueries, orgUnitId })}`);
    };

    return { setOrgUnitId };
};