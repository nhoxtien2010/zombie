class SupportsController < ApplicationController


  before_filter :get_zombie

  def get_zombie
    @zombie = Zombie.find(session[:current_zombie])
  end


  def index
    @pages_number = Support.all.length/8
    @supports_number = params[:support_page].to_i||0
    sql = "select * from supports offset #{@supports_number * 8} limit 8"


    @supports = Support.find_by_sql(sql)
    @zombie_supports = @zombie.supports
    respond_to do |format|
      format.html
    end
  end

  def wear
    support = Support.find(params[:support_id])
    respond_to do |format|
      if @zombie.gold >= support.price
        cloth = Cloth.new
        cloth.zombie = @zombie
        cloth.support = support
        cloth.save

        @zombie.gold = @zombie.gold - support.price
        @zombie.attack = @zombie.attack + support.attack
        @zombie.speed = @zombie.speed + support.speed
        @zombie.defence = @zombie.defence + support.defence
        @zombie.save

        format.json{ render :json => {:success => true}}
      else

        format.json{ render :json => {:success => false}}


      end
    end
  end

  def unwear
    success = false
    support = Support.find(params[:support_id])
    cloth= Cloth.where(:support_id => params[:support_id], :zombie_id => @zombie.id).first
    success = true if cloth
    cloth.delete
    cloth.save

    @zombie.attack = @zombie.attack - support.attack
    @zombie.speed = @zombie.speed - support.speed
    @zombie.defence = @zombie.defence - support.defence
    @zombie.save

    respond_to do |format|
      format.json{render :json => {:success => success}}
    end

  end

end