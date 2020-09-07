Nova.booting((Vue, router, store) => {
    router.addRoutes([
        {
            name: "tool",
            path: "/tool",
            component: require("./components/Tool")
        }
    ]);
});
