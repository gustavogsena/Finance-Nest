import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Header from './Header';

function PaginaPadrao() {
    return (
        <div className=''>
            <Header />
            <div className='flex h-[calc(100vh-75px)] sm:h-[calc(100vh-90px)] '>
                <Nav />
                <div className='flex flex-col bg-cinza-600 w-full rounded-tl-[30px] h-full overflow-x-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default PaginaPadrao
