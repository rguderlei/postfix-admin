Postfix Admin
=============

Sometimes, this will be a simple web frontend to manage an ISP style Postfix/Dovecot installation.
The project is still under heavy development and is far from being production ready.

Basically, the intention of the project is to manage virtual mailboxes and forwardings.

Assumptions
-----------

Postfix, saslauthd, and dovecot are using a mysql backend for the configuration of virtual
mailboxes and forwardings.

the database schema for mailboxes and forwardings is given by
```
CREATE TABLE forwardings (source varchar(80) NOT NULL, destination TEXT NOT NULL, PRIMARY KEY (source) );
CREATE TABLE users (email varchar(80) NOT NULL, password varchar(20) NOT NULL, PRIMARY KEY (email) );
```

Technology
----------

The project is based on
- [Ruby](http://www.ruby-lang.org)
- [Sinatra](http://www.sinatrarb.com)
- [Sequel](http://sequel.rubyforge.org)
- [Twitter Bootstrap](http://twitter.github.com/bootstrap)
- [JQuery](http://jquery.org)
