require 'rubygems'
require 'json'

class WeaponsController < ApplicationController

  before_filter :get_zombie
# //////////////////proxy///////////////////////

  def create

    weapons = []

    a= JSON.parse(params["weapons"])
    hash = a.kind_of?(Array)? a : ([]<<a)
    hash.each do |item|
      weapon = Weapon.new
      weapon.name = item["name"]
      weapon.price = item["price"]
      weapon.attack = item["attack"]
      weapon.speed = item["speed"]
      weapon.range = item["range"]
      weapon.weapon_type = WeaponType.where(:name=> item["weapon_type"]).first if  WeaponType.where(:name=> item["weapon_type"]).first
      if item["equip"] == true and @zombie.gold > weapon.price

          equip = Equip.new
          equip.zombie = @zombie
          equip.weapon = weapon
          equip.save
          @zombie.gold = @zombie.gold - item["price"].to_i
          @zombie.attack = @zombie.attack + item["attack"].to_i
          @zombie.speed = @zombie.speed + item["speed"].to_i
          @zombie.save
      end

      weapon.save
      weapons << weapon
    end

    render :json => {"success" => true, "message" => "Create all weapons successfully!", "weapons"=> weapons}
  end

  def update
    a= JSON.parse(params["weapons"])
    hash = a.kind_of?(Array)? a : ([]<<a)
    result = "Update "

    weapons = []

    # save all hash is a array
    hash.each do |item|
      
      weapon = Weapon.find(item["id"])
      result = result+ weapon.id.to_s + ", "
      weapon.name = item["name"] if item["name"]
      weapon.price = item["price"] if item["price"]
      weapon.attack = item["attack"] if item["attack"]
      weapon.speed = item["speed"] if item["speed"]
      weapon.range = item["range"] if item["range"]
      weapon.weapon_type = WeaponType.where(:name=> item["weapon_type"]).first if  WeaponType.where(:name=> item["weapon_type"]).first
      if item["equip"] == true
        price = weapon.price

        if @zombie.gold > price

          equip = Equip.new
          equip.zombie = @zombie
          equip.weapon = weapon
          equip.save

          @zombie.gold = @zombie.gold - item["price"].to_i
          @zombie.attack = @zombie.attack + item["attack"].to_i
          @zombie.speed = @zombie.speed + item["speed"].to_i
          @zombie.save
        end

      else item["equip"] == false
          @zombie.attack = @zombie.attack - item["attack"].to_i
          @zombie.speed = @zombie.speed - item["speed"].to_i
          @zombie.save
      end
      weapon.save
      weapons << weapon
    end
    render :json => {"success" => true, "message"=> result, "weapons" => weapons}
  end

  def destroy
    if params["weapons"].include? ","
      hash = JSON.parse(params["weapons"])
    else
      hash = params["weapons"].to_i.to_a
    end

    message = "Destroy weapons: "
    hash.each do |id|
      Weapon.find(id).delete
      message = message + id.to_s+", "
    end
    render :json => {"success" => true, "message" => message}

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

  # ///////////////////////////////////////////////////////////////////////

  def get_zombie
    @zombie = Zombie.all.first
  end
  def get_zombie_info
    rs = {'id'=> @zombie.id,
      'name'=> @zombie.name,
      'gold' => @zombie.gold,
      'attack'=>@zombie.attack,
      'speed'=>@zombie.speed,
      'birthday'=>@zombie.birthday,
      'defence'=> @zombie.defence}
    render :json =>{"zombie"=>[rs]}
  end

  def index
  end

  def data
    render :json => { "data" => {"title" => "abc"}}
  end

  def get_index
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
