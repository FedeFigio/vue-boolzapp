var app = new Vue({
    el: "#root",
    data: {
        contacts: contacts,
        activeIndex: 0
    },
    methods: {
        setActiveContact(index) {
            this.activeIndex = index
        },
        lastMessage(index) {
            var msgs = contacts[index].messages
            return msgs[msgs.length - 1]
        }
    },
    computed: {
        activeContactMessages() {
            return contacts[this.activeIndex].messages
        }

    },
    mounted() {

    }


})