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
            this.contacts[this.activeIndex].unread = false
        },
        deleteMessage(index) {
            this.activeContactMessages[index].text = "Messaggio Cancellato"
            this.untoggleAllMenu()
        },
        lastMessage(index) {
            var msgs = contacts[index].messages
            return msgs[msgs.length - 1]
        },
        autoAnswer(i) {
            setTimeout(() => {
                let obj = {
                    date: this.actualDateMessage(),
                    text: "ok",
                    status: 'received',
                }

                if (i != this.activeIndex) {
                    contacts[i].unread = true
                }
                contacts[i].messages.push(obj)
            }, 1000);
        },
        sentMessage() {
            let index = this.activeIndex
            if (this.inputTxt != "") {

                let obj = {
                    date: this.actualDateMessage(),
                    text: this.inputTxt,
                    status: 'sent'
                }
                contacts[this.activeIndex].messages.push(obj)
                this.inputTxt = ""
                this.autoAnswer(index)
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
            this.untoggleAllMenu()
            if (!status) {
                editMessage.classList.add("active")
            }
        },
        untoggleAllMenu() {
            document.querySelectorAll(".edit-message").forEach((e) => {
                e.classList.remove("active")
            })
        },
        rootClick(e) {
            var containEditMessage = false;
            for (let i = 0; i < e.path.length; i++) {
                if (e.path[i].classList && e.path[i].classList.contains("message-card")) {
                    containEditMessage = true;
                    break;
                }
            }
            if (!containEditMessage) {
                this.untoggleAllMenu()
            }
        },
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
})