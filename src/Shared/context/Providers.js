import ShopProvider from "./shop-context";
import AuthProvider from "./auth-context";
import SideDrawerProvider from "./sidedrawer-context";
import SearchProvider from "./search-context";

const Providers = props => {

    return (
        <SearchProvider>
            <ShopProvider>
                <AuthProvider>
                    <SideDrawerProvider>
                        { props.children }
                    </SideDrawerProvider>
                </AuthProvider>
            </ShopProvider>
        </SearchProvider>
    )
}

export default Providers;
