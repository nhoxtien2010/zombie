class SupportsController < ApplicationController


  before_filter :get_zombie

  def get_zombie
    @zombie = session[:current_zombie]
  end


  def index
    @supports = Support.all
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
    support = support.find(params[:support_id])
    cloth= Cloth.where(:support_id => params[:support_id], :zombie_id => @zombie.id).first
    cloth.delete
    cloth.save

    @zombie.attack = @zombie.attack - support.attack
    @zombie.speed = @zombie.speed - support.speed
    @zombie.defence = @zombie.defence - support.defence
    @zombie.save
    respond_to do |format|
      if cloth
        format.json {render :json =>{:success => true}}
      else
        format.json {render :json => {:success => false}}
      end
    end

  end

end