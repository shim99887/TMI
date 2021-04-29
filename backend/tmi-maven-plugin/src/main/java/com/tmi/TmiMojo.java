package com.tmi;

import java.io.File;
import java.io.FilenameFilter;
import java.util.List;

import org.apache.maven.model.Build;
import org.apache.maven.model.Dependency;
import org.apache.maven.model.Model;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.project.MavenProject;

@Mojo(name = "tmi-dependency", defaultPhase = LifecyclePhase.PACKAGE)
public class TmiMojo extends AbstractMojo{
	@Parameter(defaultValue = "${project}", required = true, readonly = true)
	MavenProject project;
	private Model model;
	private Build build;
	private File targetDir;

	public void execute() throws MojoExecutionException{
		List<Dependency> dependencies = project.getDependencies();
	    long numDependencies = dependencies.stream().count();          
	    getLog().info("Number of dependencies: " + numDependencies);
	
	    this.model = project.getModel();
	    this.build = model.getBuild();
	    this.targetDir = new File(build.getDirectory());
	    
	    File dir = new File(targetDir + "surefire-reports/");
	    
	    FilenameFilter filter = new FilenameFilter() {
	        public boolean accept(File f, String name) {
	            return name.startsWith("TEST");
	        }
	    };
	    File [] junitFileXmlArr = dir.listFiles(filter);
	    //List<File> junitXmlFileList = new ArrayList<>();
	    File jacocoXmlFile = new File(targetDir + "/site/jacoco.xml");
	    
	    for(int i=0;i<junitFileXmlArr.length;i++) {
	    	getLog().info("junit xml file name " + junitFileXmlArr[i].getName());
	    }
	    
	    getLog().info("jacoco xml file name " + jacocoXmlFile.getAbsolutePath());
	    getLog().info("project directory: " + targetDir);
	}
}
