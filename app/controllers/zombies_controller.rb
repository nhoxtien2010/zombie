class ZombiesController < ApplicationController

  def make_rooting
      self.rooting = true if age >20
  end

  def zombie_new
    @zombie = Zombie.new
    respond_to{|format| format.js}
  end

  # GET /zombies
  # GET /zombies.xml
  def index
    @zombies = Zombie.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @zombies }
      format.json { render :json => @zombies}
    end
  end

  # GET /zombies/1
  # GET /zombies/1.xml
  def show
    @zombie = Zombie.find(params[:id])

    respond_to do |format|
      format.html
      format.js      
    end
  end

  # GET /zombies/new
  # GET /zombies/new.xml
  def new
    @zombie = Zombie.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @zombie } 
    end
  end


  # GET /zombies/1/edit
  def edit
    @zombie = Zombie.find(params[:id])
    respond_to do |format|
      format.js
    end
  end
  def create
    @zombie = Zombie.new(params[:zombie])

    # render :js
    respond_to do |format|
      if @zombie.save
        format.js
        format.json {render :json => {'success' => true}}
        format.xml  {render :xml => @zombie, :status => :created, :location => @zombie }
      else
        format.json {render :json => {'success' => false}}
        format.xml  { render :xml => @zombie.errors, :status => :unprocessable_entity }
      end
    end

  end

  # PUT /zombies/1
  # PUT /zombies/1.xmle
  def update
    @zombie = Zombie.find(params[:id])

    respond_to do |format|
      if @zombie.update_attributes(params[:zombie])
        format.js
        format.xml  { head :ok }
      else
        # format.html { render :action => "edit" }
        format.xml  { render :xml => @zombie.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /zombies/1
  # DELETE /zombies/1.xml
  def destroy
    @zombie = Zombie.find(params[:id])
    @zombie.destroy
    respond_to do |format|
      # format.html { redirect_to(tweets_url) }
      format.json  { head :ok }
      format.js
    end
  end
end
