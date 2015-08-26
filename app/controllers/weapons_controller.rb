require 'rubygems'
require 'json'

class WeaponsController < ApplicationController
# //////////////////proxy///////////////////////

  def create
    hash = JSON.parse(params["weapons"])
    weapon = Weapon.new
    weapon.name = hash["name"]
    weapon.price = hash["price"]
    weapon.attack = hash["attack"]
    weapon.speed = hash["speed"]
    weapon.range = hash["range"]
    weapon.weapon_type = WeaponType.where(:name=> hash["weapon_type"]).first if  WeaponType.where(:name=> hash["weapon_type"]).first
    weapon.save
    render :json => {"success" => true, "message" => "Created new weapon", "data"=> weapon}
  end

  def update
    hash = JSON.parse(params["weapons"])
    weapon = Weapon.find(hash["id"])
    weapon.name = hash["name"] if hash["name"]
    weapon.price = hash["price"] if hash["price"]
    weapon.attack = hash["attack"] if hash["attack"]
    weapon.speed = hash["speed"] if hash["speed"]
    weapon.range = hash["range"] if hash["range"]
    weapon.weapon_type = WeaponType.where(:name=> hash["weapon_type"]).first if  WeaponType.where(:name=> hash["weapon_type"]).first
    weapon.save
    render :json => {"success" => true, "message"=> "Update successfully", "data" => weapon}
  end

  def destroy
    id = params[:weapons].to_i
    p "--------------------------------------------------------------------"
    p id
    p "--------------------------------------------------------------------"

    Weapon.find(id).delete
    render :json => {"success" => true, "message" => "Destroy weapon #{id}"}

  end

  def getWpType
    weaponTypes = WeaponType.all
    arrWpType = []
    weaponTypes.each do |wpType|
      wt = {"id"=> wpType.id, "name"=> wpType.name}
      arrWpType << wt
    end

    p arrWpType
    respond_to do |format|
      format.json {render :json =>{"wpType"=> arrWpType, "total"=> weaponTypes.length }}
    end
  end

  # /////////////////////////////////////////

  def get_zombie
    @zombie = Zombie.find(session[:current_zombie])
  end

  def index
  end

  def data
    render :json => { "data" => {"title" => "abc"}}
  end

  def get_index
    @zombie =Zombie.find(1)
    weapons = Weapon.order(:id).offset(params[:start]).limit(params[:limit])
    zombie_weapons = @zombie.weapons
    total = Weapon.all.length

    result = []
    weapons.each do |wp|
      name = wp.weapon_type ? wp.weapon_type.name : ""
      rs = {'id'=> wp.id,
      'name'=> wp.name,
      'price' => wp.price,
      'attack'=>wp.attack,
      'speed'=>wp.speed,
      'range'=> wp.range,
      'weapon_type'=> name}
      if zombie_weapons.include?wp
        rs['equip']=true
      else
        rs['equip']=false
      end
      result<< rs

    end
    p "-------------------------------------------------------------------------------"

    p result
    p "-------------------------------------------------------------------------------"

    respond_to do |format|
      format.json {render :json => {"weapons" => result, "total"=> total}}
    end

  end


# buy weapon for zombie
  def buy
    weapon = Weapon.find(params[:weapon_id])
    respond_to do |format|
      if @zombie.gold >= weapon.price
        equip = Equip.new
        equip.zombie = @zombie
        equip.weapon = weapon
        equip.save

        @zombie.gold = @zombie.gold - weapon.price
        @zombie.attack = @zombie.attack + weapon.attack
        @zombie.speed = @zombie.speed + weapon.speed
        @zombie.save

        format.json{ render :json => {:success => true}}
      else

        format.json{ render :json => {:success => false, :weapon => weapon, :zombie => @zombie}}


      end
    end
  end

  def unequip
    success = false
    weapon = Weapon.find(params[:weapon_id])
    eq= Equip.where(:weapon_id => params[:weapon_id], :zombie_id => @zombie.id).first
    success = true if eq
    eq.delete
    eq.save

    @zombie.attack = @zombie.attack - weapon.attack
    @zombie.speed = @zombie.speed - weapon.speed
    @zombie.save
    respond_to do |format|
      if success
        format.json {render :json =>{:success => true}}
      else
        format.json {render :json => {:success => false}}
      end
    end

  end
end
