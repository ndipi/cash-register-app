FROM ruby:2.7.4

# Set working directory
WORKDIR /app

# Install Node.js and Yarn
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -qq && \
    apt-get install -y nodejs yarn build-essential libpq-dev jq

# Install correct bundler version
RUN gem install bundler:2.4.22

# Install bundler and dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle _2.4.22_ install

# Ensure the 'pg' gem is installed
RUN bundle add pg

# Copy the rest of the app
COPY . ./

# Install JavaScript dependencies only if package.json and yarn.lock exist
RUN if [ -f package.json ] && [ -f yarn.lock ]; then yarn install --check-files; fi


# Precompile assets (optional)
# RUN npm install
RUN npm cache clean --force
RUN npm install --force
RUN bundle exec rails assets:precompile

# Expose ports
EXPOSE 3000
EXPOSE 3035

# Start the Rails server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
