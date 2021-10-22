import "./DocumentationPage.css";

export default function DocumentationPage(): JSX.Element {
    function documentation() {
        return (
            <div>
                <h2>Documentation</h2>

                <ul>
                    <h3>Client documentation</h3>
                    <li>You can browse coupons and add them to cart as guest</li>
                    <li>You can purchase coupons only after login as customer</li>
                    <li>Trying to purchase coupons as guest will throw notification of necessity to login</li>
                    <li>You can register new customer by clicking on login button, then clicking on want to sign-up</li>
                    <li>There are two options to sign-up, as customer or as company
                        <ul>
                            <li>Signing up as Customer grants you immediate access to customer features after login</li>
                            <li>Signing up as Company requires admin approval, after login you will be blocked from all company features until approval</li>
                            <li>`You can login as admin and approve access by setting isActive to true in companies list`</li>
                        </ul>
                    </li>
                    <li>Every client type has its own route pages, trying to access a page not available to specific client type will show "Page not found"</li>
                    <li>Being idle for 30 minutes you will be logged out automatically</li>
                    <br />

                    <h3>Customer</h3>
                    <li>Customer can browse available coupons and add them to cart</li>
                    <li>Customer can purchase coupons present in the cart</li>
                    <li>Customer cannot purchase same coupon again</li>
                    <li>Customer can access its profile by clicking on person icon</li>
                    <li>In profile page customer can see its info including purchased coupons</li>
                    <br />

                    <h3>Company</h3>
                    <li>Not active company cannot make any actions before admin approval</li>
                    <li>Active company have full access to company features</li>
                    <li>Company can browse its own coupons</li>
                    <li>Company cannot browse other companies coupons</li>
                    <li>Company can add new coupons to system</li>
                    <li>Company can edit its own coupons</li>
                    <li>Company can delete its own coupons</li>
                    <li>Deleting coupon that were purchased by customer, also will delete it from customers possession</li>
                    <br />

                    <h3>Admin</h3>
                    <li>Admin can browse existing customers and companies present in the system</li>
                    <li>Admin can delete customers and companies</li>
                    <li>Admin can add new customers and companies</li>
                    <li>Admin can edit existing customers and companies</li>
                    <li>Admin cannot edit id of clients and cannot edit companies names</li>
                    <li>Companies added by admin automatically active</li>
                    <li>Admin cannot browse coupons, edit or delete them</li>
                    <li>Admin cannot add new admins</li>
                    <br />
                </ul>

                <h2>Features</h2>

                <ul>
                    <li>Expired coupons will not be displayed</li>
                    <li>Coupons with late start date cannot be purchased, but will be displayed as greyed out with proper annotation</li>
                    <li>There are notifications displayed almost for all actions, warnings and errors</li>
                    <li>On login every client gets token from server, this token grants him access to system features</li>
                    <li>There is filter button on left side of webpage, you can filter coupons displayed / clients, depends on client type</li>
                    <li>Filter button will be displayed only if there are content to filter</li>
                    <li>This project uses redux persist, this allows to store state locally on clients device
                        <ul>
                            <li>Redux persist in this project stores clients login information on device and allows to stay logged in after page refresh or even closing the browser</li>
                            <li>In addition redux persist stores clients coupons added to cart</li>
                            <li>Clients login session is separate in server and clients browser</li>
                            <li>Clients login session stays active on server side if you close the window or browser</li>
                            <li>Clients session on server side ends if client clicked logout button, or if there were no actions from client for 30 minutes</li>
                            <li>Closing the window or browser while being logged in and then open it again after 30 minutes passed will perform automatic logout action</li>
                            <li>Closing the window or browser while being logged in and then open it again before 30 minutes passed will perform session update</li>
                        </ul>
                    </li>
                    <li>This project uses custom reusable react components</li>
                    <li>This project has dark mode toggle</li>
                    <li>This project uses css variables and global classes</li>
                    <li>This project heavily uses react functional components with hooks</li>
                </ul>
            </div>
        );
    }

    return (
        <div className="DocumentationPage">
            {documentation()}
        </div>
    );
}