import Loadable from 'react-loadable';
import Loading from './Loading';

const AboutLoadable = Loadable({
    loader: () => import('./About'),
    loading: Loading
});

export default AboutLoadable;