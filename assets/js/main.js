var app = new Vue({
    el: "#root",
    data: {
        contacts: contacts,
        activeIndex: 0,
        inputTxt: "",

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
                    date: this.actualDate,
                    text: "ok",
                    status: 'received'
                }
                contacts[this.activeIndex].messages.push(obj)

            }, 1000);

        },
        sentMessage() {
            if (this.inputTxt != "") {

                let obj = {
                    date: this.actualDate,
                    text: this.inputTxt,
                    status: 'sent'
                }
                console.log(obj.date);
                contacts[this.activeIndex].messages.push(obj)
                this.inputTxt = ""
                this.autoAnswer()

            }
        }
    },
    computed: {
        activeContactMessages() {
            return contacts[this.activeIndex].messages
        },
        actualDate() {
            var today = new Date();

            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var h = String(today.getHours())
            var m = String(today.getMinutes())
            var s = String(today.getSeconds())

            today = `${mm}/${dd}/${yyyy} ${h}:${m}:${s}`

            return today
        }


    },
    mounted() {



    }


})