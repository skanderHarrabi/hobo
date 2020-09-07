Nova.booting((Vue, router, store) => {
    router.addRoutes([
        {
            name: "testingtool",
            path: "/testingtool",
            component: require("./components/Tool")
        }
    ]);
});
