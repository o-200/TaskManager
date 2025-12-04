source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.3.4'

gem 'rails', '~> 7.2.3'
gem 'pg', '~> 1.1'
gem "puma", ">= 7"
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'jbuilder', '~> 2.7'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'bcrypt', '~> 3.1.7'
gem 'simple_form'
gem "state_machines", "~> 0.100.4"
gem "state_machines-activerecord", "~> 0.9.0"
gem "slim-rails"
gem 'kaminari'
gem 'ransack'
gem 'responders'
gem 'active_model_serializers'
gem 'tzinfo-data', platforms: [:windows]
gem "webpacker-react", "~> 0.3.2"
gem 'js-routes'
gem 'coveralls_reborn'

group :development, :test do
  gem 'byebug', platforms: [:mri, :windows]
  gem 'factory_bot_rails'
  gem 'rubocop'
end

group :development do
  gem 'web-console', '>= 4.1.0'
  # gem "rack-mini-profiler", "~> 2.3"
  gem 'listen', '~> 3.3'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem "selenium-webdriver", "~> 4.1"
  gem 'webdrivers'
  gem 'simplecov'
  gem 'simplecov-lcov'
end

gem "dotenv", "~> 3.2"
