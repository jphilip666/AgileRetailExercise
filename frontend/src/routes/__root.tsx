import * as React from 'react';
import { Outlet, Link, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    <span className="text-3xl font-medium">Agile X</span>
                </Link>{' '}
            </div>
            <hr />
            <Outlet />
        </React.Fragment>
    );
}
