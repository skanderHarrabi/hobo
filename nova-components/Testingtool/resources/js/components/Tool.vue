<template>
    <div>
        <heading class="mb-6">Hamza testing tool</heading>
        <card>
            <div class="overflow-hidden overflow-x-auto relative">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>balance</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users">
                            <td class="text-center">{{ user.id }}</td>
                            <td class="text-center">{{ user.name }}</td>
                            <td class="text-center">{{ user.balance }}</td>
                            <td class="text-center">{{ user.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            users: []
        };
    },
    mounted() {
        this.getRoutes();
        this.$toasted.show("It worked!", { type: "success" });
    },
    methods: {
        getRoutes() {
            Nova.request()
                .get("/nova-vendor/testingtool/users")
                .then(response => {
                    this.users = response.data;
                });
        }
    }
};
</script>
