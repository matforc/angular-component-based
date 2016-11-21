angular.module("mailApp", ["mail.search"]);

/** a very basic service */
function AccountServiceImpl(){
        var accountEmail = "carlo.bonamico@gmail.com";
        
        this.getAccountEmail = function ()
        {
            return accountEmail;
        };
}

angular.module("mailApp")
    .service("AccountService", AccountServiceImpl);
    
/** a very basic controller which requests injection of a service */
function AccountController(AccountService) {
    this.accountEmail = AccountService.getAccountEmail();
}

angular.module("mailApp")
    .controller("AccountController", AccountController);




/* Main page controller, coordinates all the other components  */
function MailController(AccountService, MessageService)
{
    this.defaultQuery = "js";
    
    //TODO load messages list from service
    function loadInbox(){ 
        return MessageService.getMessages();
    };
    
    this.messages = [];
    this.currentMessage = null; 

    this.selectCurrentMessage = function (message)
    {
        this.currentMessage = message; 
    }



    this.delete = function (message) {
        var index = this.messages.indexOf(message);
        if (index != -1) {
            this.messages.splice(index, 1);
        }
    };

    //TODO load data from services (or backend)
    this.folders = [
        "Inbox",
        "Trash",
        "Sent"
    ];
    this.customFolders = [
        "Angular",
        "Typescript",
    ];
    this.defaultFolder = 'Inbox';
    
    this.selectFolder = function (folderName) {
        this.messageListTitle = folderName;
        
        if ("Inbox" == folderName)
        {
            this.messages = loadInbox();
            return;
        }   
        //TODO load data from services (or backend)
        this.messages = [
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
                subject: folderName + " 1",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@nispro.it",
                subject: folderName + " 2",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
                subject: folderName + " 3",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@nispro.it",
                subject: folderName + " 4",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
                subject: folderName + " 5",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@nispro.it",
                subject: folderName + " 6",
                body: " a b c d e f  "
            },

        ];

    };

  
    this.replyTo = function (message){
        //TODO optional lab: delegate reply to MessageReplyService
        var template = {
            to: message.from,
            subject: "Re: " + message.subject,
            body: ">" + message.body
        };
        this.compose(template);
        
    };

    this.forward = function (message){
        //TODO optional lab:
        
    };

    //TODO discuss if initialize the sender here or in the composer    
    this.draft = {
        from : AccountService.getAccountEmail()
    };

    this.send = function (message) {
        this.closeComposer(); 

        //TODO add to sent
        //close compose  
    };
    
    this.closeComposer = function () {
        this.composerActive = false; 
    };
    
    this.compose = function (template) {
    
        if (template) {
            this.draft.to = template.to;
            this.draft.subject = template.subject;
            this.draft.body = template.body; //TODO add signature 
        } 
        this.composerActive = true; 
    };

//too on search results
//        this.messageListTitle = folderName;



}

angular.module("mailApp")
    .controller("MailController", MailController);


