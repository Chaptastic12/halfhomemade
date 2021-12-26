import ShopProvider from "./shop-context";
import AuthProvider from "./auth-context";
import SideDrawerProvider from "./sidedrawer-context";

const Providers = props => {

    return (
        <ShopProvider>
            <AuthProvider>
                <SideDrawerProvider>
                    { props.children }
                </SideDrawerProvider>
            </AuthProvider>
        </ShopProvider>
    )
}

export default Providers;
