import Loadable from 'react-loadable';
import Loading from '../component/Loading';

const TodoLoadable = Loadable({
    loader: () => import('./Todo'),
    loading: Loading
});

export default TodoLoadable;