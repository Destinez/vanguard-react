
export const Routes = {
    // pages
    DashboardOverview: { path: "/" },
    DashboardOverview: { path: "/dashboard" },
    Transactions: { path: "/transactions" },
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signin: { path: "/sign-in" },
    Logout: { path: "/logout" },
    Signup: { path: "/sign-up" },
    SignupRef: { path: "/sign-up/:ref_link" },
    ForgotPassword: { path: "/forgot-password" },
    ResetPassword: { path: "/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },
    Verification: { path: "/verification"},


    //Wallet
    Deposit: { path: "/wallet/deposit" },
    Withdrawal: { path: "/wallet/withdrawal" },
    Transfer: { path: "/wallet/transfer" },
    Balance: { path: "/wallet/balance" },
    Transactions: { path: "/wallet/transactions" },

    //Investment
    NewInvestment: {path: "/investment/new-investment"},
    InvestmentHistory: {path: "/investment/investment-history"},
    CompleteNewInvestment: {path: "/investment/complete-new-investment/:plan_id"},

    //Account
    Profile: { path: "/account/profile"},
    ChangePassword: { path: "/account/change-password"},

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" }
};