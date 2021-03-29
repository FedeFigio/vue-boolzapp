var app = new Vue({
    el: "#root",

    data() {
        return {
            contacts: contacts,
            activeIndex: 0,
            inputTxt: "",
            inputSearch: "",
        };
    },
    methods: {
        setActiveContact(index) {
            this.activeIndex = index
        },
        lastMessage(index) {
            var msgs = contacts[index].messages
            return msgs[msgs.length - 1]
        },
        autoAnswer() {
            setTimeout(() => {
                let obj = {
                    date: this.actualDateMessage(),
                    text: "ok",
                    status: 'received'
                }
                contacts[this.activeIndex].messages.push(obj)

            }, 1000);
        },
        sentMessage() {
            if (this.inputTxt != "") {

                let obj = {
                    date: this.actualDateMessage(),
                    text: this.inputTxt,
                    status: 'sent'
                }
                contacts[this.activeIndex].messages.push(obj)
                this.inputTxt = ""
                this.autoAnswer()
            }
        },
        actualDateMessage() {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var h = String(today.getHours())
            var m = String(today.getMinutes())
            var s = String(today.getSeconds())

            return `${mm}/${dd}/${yyyy} ${h}:${m}:${s}`
        },
        toggleMenu(e) {
            let editMessage = e.target.parentNode.querySelector(".edit-message")
            let status = editMessage.classList.contains("active")
            document.querySelectorAll(".edit-message").forEach((e) => {
                e.classList.remove("active")
            })
            if (!status) {
                editMessage.classList.add("active")
            }
        }
    },
    computed: {
        activeContactMessages() {
            return contacts[this.activeIndex].messages
        },
        filteredContacts() {
            if (this.inputSearch == "" || this.inputSearch == null) {
                return this.contacts;
            }
            return this.contacts.filter((contact) => {
                return contact.name.toLowerCase().includes(this.inputSearch.toLowerCase());

            })
        },
    },
    mounted() {}
})