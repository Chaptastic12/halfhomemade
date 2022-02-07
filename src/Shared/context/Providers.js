import ShopProvider from "./shop-context";
import AuthProvider from "./auth-context";
import SideDrawerProvider from "./sidedrawer-context";
import SearchProvider from "./search-context";
import ServerProvider from "./server-context";

const Providers = props => {

    return (
        <ServerProvider>
            <SearchProvider>
                <ShopProvider>
                    <AuthProvider>
                        <SideDrawerProvider>
                            { props.children }
                        </SideDrawerProvider>
                    </AuthProvider>
                </ShopProvider>
            </SearchProvider>
        </ServerProvider>
    )
}

export default Providers;
