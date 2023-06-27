# frozen_string_literal: true

require 'js-routes'

namespace :js_routes do
  desc 'Generate js routes for webpack'
  task generate: :environment do
    routes_dir = Rails.root.join('app', 'javascript', 'routes')
    file_name = File.join(routes_dir, 'ApiRoutes.js')
    FileUtils.mkdir_p(Rails.root.join(routes_dir))
    JsRoutes.generate!(file_name, camel_case: true)
  end
end
