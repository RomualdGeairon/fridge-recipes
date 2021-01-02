class TestController < ApplicationController
    @@data = File.read("storage/recipes.json")
    def index
        render json: @@data
    end
end
