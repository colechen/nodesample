cat 'eval "$(rbenv init -)"' >> ~/.bash_profile 

### Install Ruby
'' brew install rbenv ruby-build
'' cat 'eval "$(rbenv init -)"' >> ~/.bash_profile
'' source  ~/.bash_profile
'' rbenv install 2.4.0
'' rbenv rehash
'' rbenv global 2.4.0
'' rbenv versions
### Update GEM
'' gem list
'' gem update --system
'' gem -v
### Install Bundler
'' gem install bundler
'' rbenv rehash
'' bundle -v
### Install Rails
'' gem install rails
'' rbenv rehash
'' rails -v
### Install MySQL
'' brew install mysql
'' mysql --version
### MySQL is installed without a password.  To secure it, run:
'' mysql_secure_installation
### To start MySQL at login, run:
'' brew services start mysql
### To start MySQL manually each time, run:
'' mysql.server start
### To connect to MySQL, run:
'' mysql -uroot
### For GUI, install [MySQL Workbench]. 
